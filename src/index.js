const HelloWorld = () => {
    const element = document.createElement('div')

    element.innerHTML = 'Hello my beautiful world!'

    return element
}

window.onload = () => {
    document.body.append(HelloWorld())
}
