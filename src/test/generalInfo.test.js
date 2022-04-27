
const formatPhone = num => {
    if (!num) {
        return false;
    }
    else {
        //if num is 3 digits or less 
        if (num.length < 4) {
            return num
        }
        //if num is less than 7 digits 
        else if (num.length >= 4 && num.length < 7) {
            const area_code = num.slice(0, 3)
            return area_code; 
            /*
            const prefix = num.slice(3, num.length)
            area_code.unshift('(');
            area_code.push(') - ');
            return area_code + prefix*/
        }
        else if (num.length >= 7) {
            const area_code = num.slice(0, 3)
            const prefix = num.slice(3, 6)
            const suffix = num.slice(6, num.length)
            area_code.unshift('(');
            area_code.push(') - ');
            prefix.push(' - ');
            return area_code + prefix + suffix;
        }

    }
}

test('Test slice ', () => {
expect(formatPhone("4354")).toBe("435")
})