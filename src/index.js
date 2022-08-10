const HelloWorld = () => {
    const element = document.createElement('div')

    element.innerHTML = 'Hello my beautiful world!'

    return element
}

const GoodbyeWorld = () => {
    const element = document.createElement('div')

    element.innerHTML = 'Goodbye my beautiful world!'

    return element
}

window.onload = () => {
    document.body.append(HelloWorld())

    document.body.append(GoodbyeWorld())
}
