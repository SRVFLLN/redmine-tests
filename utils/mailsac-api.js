const axios = require('axios');
const data = require('../resources/user-credentials');

exports.MailsacAPI = class MailsacAPI
{
    async configAxios() {
        return axios.create( {
                baseURL: "https://mailsac.com/api/",
                headers:
                {   "Host": "mailsac.com",
                    "Mailsac-Key": `${data.key}`,
                },
            });
    }

    catchErrors(error) {
        console.dir(error);
        if (typeof error.response !== 'undefined') {
            console.log("---------------API REQUEST ERROR------------------")
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log("---------------API REQUEST ERROR------------------")
        }
        throw error;
    }

    async getMesageID() {
        const client = await this.configAxios();
        return await client.get(
        `addresses/${data.email}/messages`)
        .then(response => {
            return response.data[0]._id;
        })
        .catch(this.apiFailureCallback); //calls preconfigured catch error method
    }

    async deleteMessage(id) {
        const client = await this.configAxios();
        return await client.delete(
            `addresses/${data.email}/messages/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(this.apiFailureCallback);
    }
}