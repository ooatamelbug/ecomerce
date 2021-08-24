class User {
    static async rigesterUser(Body) {
        let statusCode = 200;
        let response = {};

        try {
            
        } catch (error) {
            statusCode = 500;
            response.data = error.data;
        }
    }
}


module.exports = User;