import React from 'react';
import ReactDOM from 'react-dom/client';


import classed from '../../src/index';

const TEST = "red";
const Title = classed.h1<{ someCondition?: boolean }>`
${({someCondition}) => `${someCondition ? "test" : "no-test"}`}
${TEST}
`;

const ExtendedTitle = classed(Title)`blue`;

function App() {
	return <div>
		<style type="text/css" dangerouslySetInnerHTML={{
			__html: `
			.bold {
				font-weight: 900;
			}
			.test {
				font-size: 12px;
			}
			.red {
				color: red;
			}
			.blue {
				color: blue;
			}
		`
		}}/>
		<h1>react-classed-components</h1>

		<Title>Test</Title>
		<Title someCondition={true}>Test</Title>
		<ExtendedTitle>Some other class</ExtendedTitle>
	</div>;
}

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App/>);
