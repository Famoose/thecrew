export abstract class WebComponent extends HTMLElement {
    selector: string
    props: string[]
    shadow = true

    constructor() {
        super()

        const template: HTMLTemplateElement = document.createElement(`template`)
        template.innerHTML = this.render()
        const templateContent = template.content
        if (this.shadow) {
            this.attachShadow({ mode: 'open' })

            if (this.shadowRoot) {
                this.shadowRoot.appendChild(templateContent.cloneNode(true))
            }
        } else {
            this.appendChild(templateContent.cloneNode(true))
        }
    }

    abstract attributeChangedCallback(
        name: string,
        _oldValue: string,
        newValue: string
    ): void

    abstract render(): string
}
