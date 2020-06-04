import { html, ReactDOM, useState, useEffect } from './react.min.mjs';

ReactDOM.render(html`<${App} />`, document.getElementById('app'));

function App() {
    const [temp, setTemp] = useState();
    const [load, setLoad] = useState();

    useEffect(() => {
        (async () => {
            document.title += ` [${await fetch('hostname').then(r => r.json())}]`;

            while (true) {
                const { temp, load } = await fetch('stats').then(r => r.json());
                setTemp(temp);
                setLoad(load);
                await new Promise(r => setTimeout(r, 1000));
            }
        })()
    }, []);

    return html`
    <div>
        <h2>Raspi stats</h2>
        <div><strong>Load: <//> ${load}</div>
        <div><strong>Temp: <//> ${temp}</div>
    </div>`
}