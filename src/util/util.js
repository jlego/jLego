// import Events from "events";

const Util = {
	/**
	 * [extend 对象拷贝]
	 * @param  {Object}  oldObj    [description]
	 * @param  {Object}  newObj    [description]
	 * @param  {Boolean} isDepCopy [description]
	 * @return {[type]}            [description]
	 */
    extend(oldObj = {}, newObj = {}, isDepCopy = false) {
    	if(isDepCopy){
    		return Lego.$.extend(true, oldObj, newObj);
    	}else{
    		return Lego.$.extend(oldObj, newObj);
    	}
    }
};
export default Util;