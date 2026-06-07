// Action script...

// [Action in Frame 12]
function  ()
{
    \x01 = 2418 + 299;
    return (eval("\x01") + true);
} // End of the function
var \x10!2 = \x10 ();
if (eval("\x10!2") == 21797)
{
} // end if
if (eval("\x10!2") == 25463)
{
} // end if
if (eval("\x10!2") == 2718)
{
} // end if
if (eval("\x10!2") == 33187)
{
} // end if
if (eval("\x10!2") == 12265)
{
} // end if
if (eval("\x10!2") == 3896)
{
} // end if
b = eval("~,");
UL = 0;
UL = 3;
UL = 0;
UL = function ()
{
    UL = _root.UL(getProperty(NULL, _x), getProperty(NULL, _y));
    UL = _root.UL(getProperty(NULL, _rotation));
    if (UL.UL(b + UL) < 40)
    {
        b = b + UL;
    }
    else
    {
        b = b * (40 / UL.UL(b));
    } // end else if
    b = b - b / UL.UL(b) / 10;
    if (UL)
    {
        var _loc3 = -UL.UL(b) * 2 * (b * getProperty(NULL, _xscale) / -UL.UL(b * getProperty(NULL, _xscale)));
        UL = UL + (_loc3 - UL) / 20;
        if (UL > 0)
        {
            --UL;
        }
        else
        {
            UL = 2;
            _root.UL(getProperty(NULL, _x) + UL(eval("~,")), getProperty(NULL, _y) + UL(eval("~,")), eval("~,") * 4, getProperty(NULL, _rotation));
        } // end else if
    }
    else
    {
        UL = -UL.UL(b) * 2 * (b * getProperty(NULL, _xscale) / -UL.UL(b * getProperty(NULL, _xscale)));
        if (UL > 0)
        {
            --UL;
        }
        else
        {
            UL = 5;
            UL = _root.UL.UL();
            _root.UL.UL(NULL, NULL + UL, UL, {UL: this.UL, UL: this.UL, UL: this.UL, UL: UL.UL(b) * 6, UL: UL.UL(b) * 6});
        } // end else if
    } // end else if
    if (UL.UL(b) > 30)
    {
        ~, = b / UL.UL(b) * 30;
    }
    else
    {
        ~, = b;
    } // end else if
    if (UL.UL(40) && (UL.UL(getProperty(NULL, _rotation)) > 5 || UL.UL(b) > 1))
    {
        if (UL.UL(getProperty(NULL, _rotation)) < 2)
        {
            if (_root.UL(this.UL + this.UL() + 5, this.UL + this.UL() + 10, true) && !_root.UL(this.UL + this.UL() + 5, this.UL + this.UL() - 5, true) && !_root.UL(this.UL + this.UL() - 5, this.UL + this.UL() + 10))
            {
                setProperty(NULL, _xscale, 100);
                gotoAndStop("LedgeDown");
                return (true);
            } // end if
            if (_root.UL(this.UL + this.UL() - 5, this.UL + this.UL() + 10, true) && !_root.UL(this.UL + this.UL() - 5, this.UL + this.UL() - 10, true) && !_root.UL(this.UL + this.UL() + 5, this.UL + this.UL() + 10))
            {
                setProperty(NULL, _xscale, -100);
                gotoAndStop("LedgeDown");
                return (true);
            } // end if
        } // end if
        UL.UL();
        UL.UL = UL.UL + UL;
    }
    else if (UL > 0)
    {
        UL.UL();
        UL.UL = UL.UL + UL;
    }
    else
    {
        UL.UL = UL.UL - UL.UL / 3;
        if (UL.UL > 1)
        {
            UL.UL();
        }
        else
        {
            UL = true;
            gotoAndStop("Duck");
        } // end else if
    } // end else if
    if (UL())
    {
        if (eval("~,") == 0)
        {
            ~, = getProperty(NULL, _xscale) / 50;
            b = eval("~,");
        } // end if
        if (UL.UL(eval("~,")) < 5)
        {
            ~, = eval("~,") / UL.UL(eval("~,")) * 5;
            b = eval("~,");
        } // end if
        UL = 10;
        UL();
    }
    else
    {
        if (UL > 0)
        {
            --UL;
        } // end if
        if (!UL())
        {
            _loc3 = UL();
            if (!UL(true))
            {
                if (UL.UL(getProperty(NULL, _rotation)) > 100 && UL.UL(eval("~,")) < 10)
                {
                    UL(0);
                    UL = 8 * (eval("~,") / UL.UL(eval("~,")));
                    if (UL.UL(eval("~,")) < 5)
                    {
                        ~, = -getProperty(NULL, _xscale) * 0.050000;
                    } // end if
                }
                else if (!UL())
                {
                    if (UL > 0)
                    {
                        --UL;
                    } // end if
                    UL();
                }
                else
                {
                    UL = 10;
                } // end if
            } // end else if
        } // end else if
    } // end else if
};
