const json2csv = (items) => {
    const replacer = (key, value) => value ?? '';

    const header = Object.keys(items[0]);
    const headerString = header.join(';');

    const rowItems = items.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(';'));
    const csv = [headerString, ...rowItems].join('\r\n');

    return csv;
};

export default json2csv;
