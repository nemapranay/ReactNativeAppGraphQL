import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "../src/HomeScreen"; // Adjust path if needed
import { useQuery } from "@apollo/client";

jest.mock("@apollo/client", () => ({
    useQuery: jest.fn(),
}));

jest.mock("../src/common/RadioGroup", () => (props) => {
    return (
        <button
            testID="radio-group"
            onClick={() => props.getUserSelection("ADMIN")}
        >
            Change Role
        </button>
    );
});

describe("HomeScreen Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders without crashing", () => {
        useQuery.mockReturnValue({
            data: { listZellerCustomers: { items: [] } },
        });

        const { getByText } = render(<HomeScreen />);
        expect(getByText("User Types")).toBeTruthy();
    });

    test("fetches and displays user list", async () => {
        useQuery.mockReturnValue({
            data: {
                listZellerCustomers: {
                    items: [
                        { id: "1", name: "John Doe", role: "ADMIN" },
                        { id: "2", name: "Jane Doe", role: "ADMIN" },
                    ],
                },
            },
        });

        const { getByText } = render(<HomeScreen />);

        await waitFor(() => {
            expect(getByText("John Doe")).toBeTruthy();
            expect(getByText("Jane Doe")).toBeTruthy();
        });
    });

    test("changes role when radio button is clicked", async () => {
        useQuery.mockReturnValue({
            data: {
                listZellerCustomers: {
                    items: [{ id: "1", name: "Alice", role: "USER" }],
                },
            },
        });

        const { getByTestId, getByText } = render(<HomeScreen />);
        const radioButton = getByTestId("radio-group");

        fireEvent.press(radioButton);

        await waitFor(() => {
            expect(getByText("Alice")).toBeTruthy();
        });
    });
});
