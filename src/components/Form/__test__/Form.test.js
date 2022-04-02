import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Form } from '../index';
import { expect } from '@jest/globals';

describe("Form test", () => {
    it("matches snaphot", () => {
        const result = render(<Form onSubmit={() => { }} />);

        expect(result).toMatchSnapshot();
    });

    it("calls onSubmit", () => {
        const handleSubmit = jest.fn();
        render(<Form onSubmit={handleSubmit} />);

        const btn = screen.getByRole("button");
        fireEvent(
            btn,
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenLastCalledWith("");
    });
});