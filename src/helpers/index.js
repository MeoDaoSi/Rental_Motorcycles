const VND_format = (cost) => {
    total_cost = cost.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    return total_cost
}

const duration = (start_date, end_date) => {
    const dateA = new Date(start_date);
    const dateB = new Date(end_date);
    const days = (dateB - dateA) / (1000 * 60 * 60 * 24);
    return days
}

module.exports = {
    VND_format,
    duration
}