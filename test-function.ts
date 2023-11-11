const test = async (p: string): Promise<string> => {
    return p ?? "";
}

console.log(test("Duncan"))