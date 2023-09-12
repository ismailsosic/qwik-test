import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from './header.css?inline'


export default component$(() => {
    useStylesScoped$(styles)
    return(
        <header>
            <nav>
                <h1>Qwikjs Tutorial</h1>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/test-page">Implement Test Page</Link>
                    </li>
                    <li>
                        <Link href="/test-component">Implement Test Component</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
})