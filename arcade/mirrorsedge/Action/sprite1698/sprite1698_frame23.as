// Action script...

// [Action in Frame 23]
CanSlide = false;
loose = false;
onEnterFrame = function ()
{
    if (!_root.Paused)
    {
        EveryFrame();
    } // end if
};
