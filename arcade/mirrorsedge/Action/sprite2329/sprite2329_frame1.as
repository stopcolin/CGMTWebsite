// Action script...

// [Action in Frame 1]
setProperty("", _name, "Coin0");
if (_root.gameMode == "baddieRush")
{
    CoinCache.gotoAndStop(2);
    stop ();
} // end if
