import VueForm from './components/VueForm.js'

VueForm.install = (app) => {
    app.component('VueForm', VueForm)
}

export default VueForm