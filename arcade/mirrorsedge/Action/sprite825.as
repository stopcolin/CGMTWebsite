// Action script...

// [Action in Frame 1]
stop ();

// [Action in Frame 8]
stop ();
login_btn.onPress = function ()
{
    getURL("http://www.mirrorsedge2d.com/signup/", "_blank");
};

// [Action in Frame 14]
stop ();
logged_in.memberName.text = _root.theMember;

// [Action in Frame 21]
login_btn.onPress = function ()
{
    _root.logClick("signup");
};
stop ();
