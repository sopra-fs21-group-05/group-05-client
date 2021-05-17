/**
 * Gameroom model
 */
class Gameroom {
    constructor(data = {}) {
        this.roomId = null;
        this.roomname = null;
        this.password = null;
        // this.userList = null;
        Object.assign(this, data);
    }
}
export default Gameroom;
