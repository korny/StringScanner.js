var StringScanner;

StringScanner = StringScanner || { };

StringScanner.str = "";
StringScanner.ptr = 0;
StringScanner.matchdata = null;

StringScanner.beginning_of_line = function beginning_of_line ()
{
    var ptr = StringScanner.ptr;
    
    return (ptr === 0) || (StringScanner.str[ptr - 1] === '\n');
}

StringScanner.concat = function concat (string)
{
    if (string === undefined)
    {
        throw ("ArgumentError: no string supplied to concat()");
    }
    
    StringScanner.str += string;
    
    return StringScanner;
}

StringScanner.eos = function eos ()
{
    return StringScanner.ptr === StringScanner.str.length;
}

StringScanner.getch = function getch ()
{
    var ptr = StringScanner.ptr;
    var str = StringScanner.str;
    
    if (ptr === str.length)
    {
        return StringScanner.matchdata = null;
    }
    
    var character = str[StringScanner.ptr++];
    
    StringScanner.matchdata = { last_ptr: ptr, string: character, captures: [] };
    
    return character;
}

StringScanner.matched = function matched (index)
{
    var capture;
    var matchdata = StringScanner.matchdata;
    
    if (!matchdata)
    {
        return null;
    }
    
    if (index === undefined)
    {
        return matchdata.string;
    }
    
    if ((capture = matchdata.captures[index]) === undefined)
    {
        return null;
    }
    
    return capture;
}

StringScanner.matched_size = function matched_size ()
{
    var matchdata = StringScanner.matchdata;
    
    if (!matchdata)
    {
        return null;
    }
    
    return matchdata.string.length;
}

StringScanner.peek = function peek (len)
{
    if (len === undefined)
    {
        throw ("ArgumentError: no length supplied to peek()");
    }
    
    return StringScanner.str.substr(StringScanner.ptr, len);
}

StringScanner.pointer = function pointer (position)
{
    if (position === undefined)
    {
        return StringScanner.ptr;
    }
    
    if (typeof(position = parseInt(position)) === 'number')
    {
        
        return StringScanner.ptr = position;
    }
}

StringScanner.reset = function reset ()
{
    StringScanner.matchdata = null;
    StringScanner.ptr = 0;
    
    return StringScanner;
}

StringScanner.rest = function rest ()
{
    return StringScanner.str.substr(StringScanner.ptr);
}

StringScanner.string = function string (string)
{
    if (typeof(string) === 'string')
    {
        StringScanner.str = string;
        StringScanner.matchdata = null;
        StringScanner.ptr = 0;
    }
    
    return StringScanner.str;
}

StringScanner.terminate = function terminate ()
{
    StringScanner.ptr = StringScanner.str.length;
    StringScanner.matchdata = null;
    
    return StringScanner;
}

StringScanner.unscan = function unscan ()
{
    var matchdata = StringScanner.matchdata;
    
    if (!matchdata)
    {
        throw ("Error: unscan() found no previous position");
    }
    
    StringScanner.ptr = matchdata.last_ptr;
    StringScanner.matchdata = null;
    
    return StringScanner;
}
