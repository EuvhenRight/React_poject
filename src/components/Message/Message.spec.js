import React from 'react';
import { render, screen } from "@testing-library/react";
import { Message } from '../Message/index';


describe("Message txt", () => {
    it("render a & t", () => {
        render(<Message text="test" author="author" />);

        const text = screen.getByText("author: test");
        expect(text).toBeDefined();
    });
});