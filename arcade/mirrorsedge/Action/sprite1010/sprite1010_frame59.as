// Action script...

// [Action in Frame 59]
function  ()
{
    \x01 = 1182 + 1939;
    return (eval("\x01") + true);
} // End of the function
var \x10!2 = \x10 ();
if (eval("\x10!2") == 13783)
{
} // end if
if (eval("\x10!2") == 42308)
{
} // end if
if (eval("\x10!2") == 3122)
{
} // end if
if (eval("\x10!2") == 502)
{
} // end if
if (eval("\x10!2") == 47007)
{
} // end if
if (eval("\x10!2") == 27164)
{
} // end if
stop ();
"" = function ()
{
    if (_parent[""].UL > 0)
    {
        var _loc6 = _parent[""].UL;
        var _loc5 = _parent[""].UL;
        var _loc4 = _parent[""].UL;
        for (var _loc3 = 0; _loc3 < 10; ++_loc3)
        {
            if (_loc4 < 25)
            {
                ++_loc4;
            } // end if
            _loc6 = _loc6 + _parent[""].UL;
            _loc5 = _loc5 + _loc4;
            if (_root.UL(_loc6, _loc5, true))
            {
                if (UL.UL(_parent[""].UL) > 6 && _parent[""].UL * _parent[""].UL > 0)
                {
                    gotoAndPlay(runfalling);
                }
                else
                {
                    gotoAndPlay(falling);
                } // end else if
                _parent[""].UL = _parent[""].UL - 1;
                "" = function ()
                {
                    if (_parent[""].UL > 0)
                    {
                        _parent[""].UL = _parent[""].UL - 1;
                    } // end if
                };
            } // end if
        } // end of for
    } // end if
};
