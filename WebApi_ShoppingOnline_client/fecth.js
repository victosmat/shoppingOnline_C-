class Fecth {
    base_url = ' https://localhost:7008';
    async get(url) {
        const res = await fetch(`${this.base_url + url}`, {
            method: 'GET',
        });
        if (res.status == 200) {
            const data = await res.json();
            return data;
        }

        return null;
    }

    async post(url, payload) {
        const res = await fetch(`${this.base_url + url}`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // const data = await res.json();

        if (res.status == 200) {
            const data = await res.json();
            console.log("RESPONSE", data);
            return data;
        }

        return null;
    }

}

const  _fecth = new Fecth();