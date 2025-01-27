import { LitElement, html, css } from 'lit'
import { connect } from 'pwa-helpers'
import { store } from '../store.js'
import { use, translate, translateUnsafeHTML, registerTranslateConfig } from 'lit-translate'

registerTranslateConfig({
  loader: lang => fetch(`/language/${lang}.json`).then(res => res.json())
})

const checkLanguage = localStorage.getItem('qortalLanguage')

if (checkLanguage === null || checkLanguage.length === 0) {
    localStorage.setItem('qortalLanguage', 'us')
    use('us')
} else {
    use(checkLanguage)
}

class LanguageSelector extends connect(store)(LitElement) {
    static get properties() {
        return {
            config: { type: Object },
            theme: { type: String, reflect: true }
        }
    }

    static get styles() {
        return [
            css`
                select {
                    width: 175px;
                    height: 34px;
                    padding: 5px 0px 5px 5px;
                    font-size: 16px;
                    border: 1px solid var(--black);
                    border-radius: 3px;
                    color: var(--black);
                    background: var(--white);
                }

                *:focus {
                    outline: none;
                }

                select option { 
                    line-height: 34px;
                }
            `
        ]
    }

    constructor() {
        super()
    }

    render() {
        return html`
            <div style="display: inline;">
		<select @change="${this.changeLanguage}">
                    <option value="us">${translate("selectmenu.selectlanguage")}</option>
		    <option value="us">US - ${translate("selectmenu.english")}</option>
		    <option value="cn">CN - ${translate("selectmenu.chinese")}</option>
		    <option value="de">DE - ${translate("selectmenu.german")}</option>
		    <option value="fr">FR - ${translate("selectmenu.french")}</option>
		    <option value="pl">PL - ${translate("selectmenu.polish")}</option>
		    <option value="sp">SP - ${translate("selectmenu.spanish")}</option>
		</select>
            </div>
        `
    }

    firstUpdated() {
        // ...
    }

    changeLanguage(event) {
       use(event.target.value)
       localStorage.setItem('qortalLanguage', event.target.value)
    }

    stateChanged(state) {
        this.config = state.config
    }
}

window.customElements.define('language-selector', LanguageSelector)
