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
            const a = this.shadowRoot.querySelector('a')
            if (a) {
                a.innerText = `${newValue}`
            }
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
