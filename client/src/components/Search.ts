import { WebComponent } from '../WebComponent'

export class Search extends WebComponent {
    selector = 'search'

    static get observedAttributes() {
        return ['name-attribute']
    }

    attributeChangedCallback(
        name: string,
        _oldValue: string,
        newValue: string
    ) {
        if (name == 'name-attribute') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.shadowRoot.querySelector(
                'a'
            ).href = `https://www.google.com/search?q=${newValue}`
        }
    }

    render() {
        return `
          <style>
            div {
              margin-top: 20px;
              color: green;
            }
          </style>
        <div>
            <p>The Google search result of your name is <a target="_blank" rel="noopener">here</a></p>
        </div>`
    }
}
