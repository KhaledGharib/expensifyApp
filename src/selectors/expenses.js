import moment from "moment";

export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const creadtedAtMoment = moment(expense.creadtedAt);

      const startDateMatch = startDate
        ? startDate.isSameOrBefore(creadtedAtMoment, "day")
        : true;

      const endDateMatch = endDate
        ? endDate.isSameOrAfter(creadtedAtMoment, "day")
        : true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
