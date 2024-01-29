# react-classed-components

Heavily inspired by styled-components, I needed something that used basic classNames without having much overhead.
This module lets you create components quickly with basic css classes.


## Getting started:
`npm i react-classed-components`


## Usage:
Example with bootstrap`s cover example: https://getbootstrap.com/docs/4.0/examples/cover/
```tsx
import classed from 'react-classed-components';

const Wrapper = classed.div`cover-container d-flex h-100 p-3 mx-auto flex-column text-center`;
const Header = classed.header`masthead mb-auto`;
const Inner = classed.div`inner`;
const BrandTitle = classed.h3`masthead-brand`;
const CoverTitle = classed.h1`cover-heading`;
const ButtonLink = classed.a`btn btn-lg btn-secondary`;
const Lead = classed.p`lead`;
const Main = classed.main`inner cover`;
const Footer = classed.main`mastfoot mt-auto`;
const Nav = classed.nav`nav nav-masthead justify-content-center`;
const NavLink = classed.a<{ active?: true }>`
	nav-link
	${({active}) => active && "active" || ''}
`;

function App() {
	return <Wrapper>
		<Header>
			<Inner>
				<BrandTitle>Cover</BrandTitle>
				<Nav className="nav nav-masthead justify-content-center">
					<NavLink active href="#">Home</NavLink>
					<NavLink href="#">Features</NavLink>
					<NavLink href="#">Contact</NavLink>
				</Nav>
			</Inner>
		</Header>
		<Main role="main">
			<CoverTitle>Cover your page.</CoverTitle>
			<Lead>Cover is a one-page template for building simple and beautiful home pages. Download,
				edit the text, and add your own fullscreen background photo to make it your own.</Lead>
			<Lead>
				<ButtonLink href="#" className="btn btn-lg btn-secondary">Learn more</ButtonLink>
			</Lead>
		</Main>
		<Footer>
			<Inner>
				<p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a
					href="https://twitter.com/mdo">@mdo</a>. implemented with classed-components</p>
			</Inner>
		</Footer>
	</Wrapper>;
}

```


