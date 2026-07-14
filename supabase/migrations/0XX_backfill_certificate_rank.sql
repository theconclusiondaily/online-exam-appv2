-- ===========================================
-- Backfill Certificate Rank & Prize Amount
-- ===========================================

WITH ranked AS (

    SELECT
        l.exam_id,
        l.user_id,

        ROW_NUMBER() OVER (

            PARTITION BY l.exam_id

            ORDER BY
                l.score DESC,
                l.time_taken ASC

        ) AS final_rank

    FROM leaderboard l

)

UPDATE certificates c

SET

    rank = r.final_rank,

    prize_amount = CASE

        WHEN r.final_rank = 1 THEN e.rank_1_amount

        WHEN r.final_rank = 2 THEN e.rank_2_amount

        WHEN r.final_rank = 3 THEN e.rank_3_amount

        ELSE 0

    END

FROM ranked r

JOIN exams e

ON e.id = r.exam_id

WHERE

    c.exam_id = r.exam_id

AND

    c.user_id = r.user_id;