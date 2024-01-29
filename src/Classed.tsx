import {
	ComponentProps,
	ComponentType,
	createElement,
	JSXElementConstructor,
	ReactElement,
} from "react";
import elements, {SupportedHTMLElements} from "./domElements";

type AcceptableTag = SupportedHTMLElements | ComponentType<any>;

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


//type ComponentProps = { className?: string, children?: ReactNode | string };


type TemplateElementFactory<T extends ComponentProps<SupportedHTMLElements>> = ({
	                                                         className,
	                                                         ...props
                                                         }: T) => ReactElement<{}, string | JSXElementConstructor<any>>;

function elementConstructor(tag: AcceptableTag): <T>(strings: TemplateStringsArray, ...calls: (string | ((props: T) => string))[]) => ({
	                                                                                                                                       className,
	                                                                                                                                       ...props
                                                                                                                                       }: ComponentProps<SupportedHTMLElements> & T) => ReactElement<{}, string | JSXElementConstructor<any>> {
	if (!tag) throw new Error("Need tag");

	return (strings: TemplateStringsArray, ...calls: (string | ((props: any) => string))[]): ({
		                                                                                          className,
		                                                                                          ...props
	                                                                                          }: ComponentProps<SupportedHTMLElements>) => ReactElement<{}, string | JSXElementConstructor<any>> => {
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
