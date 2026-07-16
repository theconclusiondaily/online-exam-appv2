DECLARE

  streak_record record;

  today_date date :=
  (now() AT TIME ZONE 'Asia/Kolkata')::date;
BEGIN

  SELECT *
  INTO streak_record
  FROM login_streaks
  WHERE user_id = p_user_id;

  IF streak_record IS NULL THEN

    INSERT INTO login_streaks
    (
      user_id,
      current_streak,
      longest_streak,
      last_login_date
    )
    VALUES
    (
      p_user_id,
      1,
      1,
      today_date
    );

    PERFORM award_login_streak_achievements(
      p_user_id
    );

    RETURN;

  END IF;

  IF streak_record.last_login_date = today_date THEN
    RETURN;
  END IF;

  IF streak_record.last_login_date =
     today_date - 1
  THEN

    UPDATE login_streaks
    SET

      current_streak =
        current_streak + 1,

      longest_streak =
        GREATEST(
          longest_streak,
          current_streak + 1
        ),

      last_login_date =
        today_date,

      updated_at = now()

    WHERE user_id = p_user_id;

  ELSE

    UPDATE login_streaks
    SET

      current_streak = 1,

      last_login_date =
        today_date,

      updated_at = now()

    WHERE user_id = p_user_id;

  END IF;

  PERFORM award_login_streak_achievements(
    p_user_id
  );

END;