import LegoCore from "./lib/core";
import BaseView from "./lib/view";
import BaseData from "./lib/data";
import BaseEvent from "./lib/event";

LegoCore.View = BaseView;
LegoCore.Data = BaseData;
LegoCore.Event = BaseEvent;
LegoCore.Ux = {};
LegoCore.Eventer = new BaseEvent();

export default LegoCore;