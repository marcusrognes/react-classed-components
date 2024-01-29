import {ComponentType, createElement, createFactory, JSXElementConstructor, ReactElement, ReactNode} from "react";
import elements, {SupportedHTMLElements} from "./domElements";

type AcceptableTag = SupportedHTMLElements | ComponentType;

function processString(string: string) {
	return string.replace(/(?:\r\n|\r|\n)/g, " ");
}

function processTemplateLiteral<T>(strings: TemplateStringsArray, calls: (string | ((props: any) => string))[], context: T) {
	let classNamesList = [];

	for (let i = 0; i < strings.length; i++) {
		classNamesList.push(strings[i].trim());
		if (typeof calls[i] == "string") {
			classNamesList.push(calls[i]);
		} else if (typeof calls[i] == "function") {
			classNamesList.push((calls[i] as (context: T) => string)(context));
		}
	}

	return processString(classNamesList.join(' '));
}


type ComponentProps = { className?: string, children?: ReactNode | string };


type TemplateElementFactory<T extends ComponentProps> = ({
	                                                         className,
	                                                         ...props
                                                         }: T) => ReactElement<{}, string | JSXElementConstructor<any>>;

type TemplateStringElementFactory<T extends ComponentProps> = (strings: TemplateStringsArray, ...calls: (string | ((props: T) => string))[]) => TemplateElementFactory<T>;

function elementConstructor(tag: AcceptableTag): <T>(strings: TemplateStringsArray, ...calls: (string | ((props: T) => string))[]) => ({
	                                                                                                                                       className,
	                                                                                                                                       ...props
                                                                                                                                       }: any) => ReactElement<{}, string | JSXElementConstructor<any>> {
	if (!tag) throw new Error("Need tag");

	// TODO: Make sure class accepts correct props, and not any
	return (strings: TemplateStringsArray, ...calls: (string | ((props: any) => string))[]): ({
		                                                                                          className,
		                                                                                          ...props
	                                                                                          }: any) => ReactElement<{}, string | JSXElementConstructor<any>> => {
		return ({className, ...props}) => {
			let classNameList = [];
			if (className) classNameList.push(className);

			classNameList.push(processTemplateLiteral(strings, calls, props));

			return createElement(tag, {...props as any, className: classNameList.map(c => c.trim()).join(' ')});
		}
	};
}

type Test<T extends readonly unknown[], U = ReturnType<typeof elementConstructor>> = { [P in T[number & keyof T] & PropertyKey]: U };

type classedType = typeof elementConstructor & Test<typeof elements>;

type Classed = typeof elementConstructor & classedType;

const classed: Classed = elementConstructor as Classed;

elements.forEach((element) => {
	classed[element] = elementConstructor(element);
})

export default classed;
