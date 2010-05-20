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

StringScanner.exist = function exist (regexp)
{
    if (regexp === undefined)
    {
        throw ("ArgumentError: no regexp supplied to exist()");
    }
    
    var ptr = StringScanner.ptr;
    var matchdata = regexp.exec(StringScanner.str.substr(ptr));
    
    if (!matchdata)
    {
        return StringScanner.matchdata = null;
    }
    
    StringScanner.matchdata = { last_ptr: ptr, string: matchdata[0], captures: matchdata.slice(1) }
    
    return matchdata.index + ptr;
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

StringScanner.init = function init (string)
{
    if (typeof(string) === 'string')
    {
        StringScanner.str = string;
        StringScanner.matchdata = null;
        StringScanner.ptr = 0;
        
        return StringScanner;
    }
    
    throw ("ArgumentError: no string supplied to init()");
}

StringScanner.match = function match (regexp)
{
    if (regexp === undefined)
    {
        throw ("ArgumentError: no regexp supplied to match()");
    }
    
    var ptr = StringScanner.ptr;
    var matchdata = (new RegExp('^' + regexp.source)).exec(StringScanner.str.substr(ptr));
    
    if (!matchdata)
    {
        return StringScanner.matchdata = null;
    }
    
    var string = matchdata[0];
    
    StringScanner.matchdata = { last_ptr: ptr, string: string, captures: matchdata.slice(1) }
    
    return string.length;
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
    if ((position !== undefined) && (typeof(position = parseInt(position)) === 'number'))
    {
        if ((position >= 0) && (position < StringScanner.str.length))
        {
            return StringScanner.ptr = position;
        }
        
        throw ("RangeError: out-of-range index supplied to pointer()")
    }
    
    return StringScanner.ptr;
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

StringScanner.scan = function scan (regexp)
{
    if (regexp === undefined)
    {
        throw ("ArgumentError: no regexp supplied to scan()");
    }
    
    var ptr = StringScanner.ptr;
    var matchdata = (new RegExp('^' + regexp.source)).exec(StringScanner.str.substr(ptr));
    
    if (!matchdata)
    {
        return StringScanner.matchdata = null;
    }
    
    var string = matchdata[0];
    
    StringScanner.ptr += string.length;
    StringScanner.matchdata = { last_ptr: ptr, string: string, captures: matchdata.slice(1) }
    
    return string;
}

StringScanner.scan_until = function scan_until (regexp)
{
    if (regexp === undefined)
    {
        throw ("ArgumentError: no regexp supplied to scan_until()");
    }
    
    var str = StringScanner.str;
    var ptr = StringScanner.ptr;
    var matchdata = regexp.exec(str.substr(ptr));
    
    if (!matchdata)
    {
        return StringScanner.matchdata = null;
    }
    
    var string = matchdata[0];
    var offset = string.length + matchdata.index;
    
    StringScanner.ptr += offset;
    StringScanner.matchdata = { last_ptr: ptr, string: string, captures: matchdata.slice(1) }
    
    return str.substr(ptr, offset);
}

StringScanner.skip = function skip (regexp)
{
    if (regexp === undefined)
    {
        throw ("ArgumentError: no regexp supplied to skip()");
    }
    
    var ptr = StringScanner.ptr;
    var matchdata = (new RegExp('^' + regexp.source)).exec(StringScanner.str.substr(ptr));
    
    if (!matchdata)
    {
        return StringScanner.matchdata = null;
    }
    
    var string = matchdata[0];
    var len = string.length;
    
    StringScanner.ptr += len;
    StringScanner.matchdata = { last_ptr: ptr, string: string, captures: matchdata.slice(1) }
    
    return len;
}

StringScanner.skip_until = function skip_until (regexp)
{
    if (regexp === undefined)
    {
        throw ("ArgumentError: no regexp supplied to skip_until()");
    }
    
    var str = StringScanner.str;
    var ptr = StringScanner.ptr;
    var matchdata = regexp.exec(str.substr(ptr));
    
    if (!matchdata)
    {
        return StringScanner.matchdata = null;
    }
    
    var string = matchdata[0];
    var offset = string.length + matchdata.index;
    
    StringScanner.ptr += offset;
    StringScanner.matchdata = { last_ptr: ptr, string: string, captures: matchdata.slice(1) }
    
    return offset;
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
