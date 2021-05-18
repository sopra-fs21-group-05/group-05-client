/**
 * Gameroom model
 */
class Gameroom {
    constructor(data = {}) {
        this.roomId = null;
        this.roomname = null;
        this.password = null;
        Object.assign(this, data);
    }
}
export default Gameroom;
