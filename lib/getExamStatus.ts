export function getExamStatus(

  startTime: string,

  endTime: string

) {

  const now =
    new Date();

  const start =
    new Date(
      startTime
    );

  const end =
    new Date(
      endTime
    );

  if (now < start) {

    return "scheduled";
  }

  if (

    now >= start &&

    now <= end

  ) {

    return "live";
  }

  return "completed";
}