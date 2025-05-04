export function strip(str: string) {
    // Just trim the string and normalize line breaks to spaces
    // but don't collapse multiple spaces which might be in attribute values
    return str.trim().replace(/\n/g, ' ');
}
