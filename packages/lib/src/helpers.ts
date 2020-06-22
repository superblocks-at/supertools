import { Table, Field, Record } from "@airtable/blocks/models";

export function recordJSON(table: Table, record: Record): any {
  const json: any = {};
  table.fields.forEach((field: any) => {
    json[field.name] = record.getCellValue(field);
  });
  return json;
}

export function fieldJSON(field: Field): any {
  return {
    id: field.id,
    name: field.name,
    type: field.type,
    isComputed: field.isComputed,
    options: field.options,
    description: field.description,
    availableAggregators: field.availableAggregators.map((aggregator: any) => {
      return {
        displayName: aggregator.displayName,
        shortDisplayName: aggregator.shortDisplayName,
        key: aggregator.key
      };
    })
  };
}

export function fieldsJSON(fields: Array<Field>): any {
  return fields.map((field) => fieldJSON(field));
}
