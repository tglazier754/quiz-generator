import { extendTheme } from '@chakra-ui/react'
import { theme as chakraTheme } from "@chakra-ui/theme";

export const theme = extendTheme(
    {
        colors: {
            ...chakraTheme.colors,
            brand: chakraTheme.colors.blue
        },
        styles: {
            global: () => ({
                body: {
                    color: 'default',
                    background: '#F7FAFC',
                },
            }),
        },
        components: {
            Button: {
                // 1. We can update the base styles
                /* baseStyle: {
                  fontWeight: 'bold', // Normally, it is "semibold"
                }, */
                // 2. We can add a new button size or extend existing
                /* sizes: {
                  xl: {
                    h: '56px',
                    fontSize: 'lg',
                    px: '32px',
                  },
                }, */
                // 3. We can add a new visual variant
                variants: {
                    /* 'with-shadow': {
                      bg: 'red.400',
                      boxShadow: '0 0 2px 2px #efdfde',
                    }, */
                    // 4. We can override existing variants
                    outline: {
                        width: "140px",
                        borderColor: "#2962FF",
                        color: "#2962FF",
                        _hover: {
                            borderColor: "#0634B5",
                            color: "#0634B5"
                        }
                    },
                    /* primary: (props: StyleFunctionProps) => ({
                      bgColor: props.borderColor === "#2962FF"? 'red.300' : 'red.500',
                      color: props.color === "#2962FF"? 'red.300' : 'red.500'
                    }), */
                    primary: {
                        width: "140px",
                        bgColor: "#2962FF",
                        _hover: {
                            bgColor: "#0634B5",
                        }
                    },
                    /* outline: {
                      borderColor="#2962FF",
                      color="#2962FF"
                    } */
                    /* (props: StyleFunctionProps) => ({
                      bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
                    }), */
                    // 5. We can add responsive variants
                    sm: {
                        bg: 'teal.500',
                        fontSize: 'md',
                    },
                },
                // 6. We can overwrite defaultProps
                defaultProps: {
                    /* size: 'lg', */ // default is md
                    /* variant: 'sm', */ // default is solid
                    // colorScheme: 'green', // default is gray
                    _hover: {
                        color: "#0634B5",
                    }
                },
            },
        },
    },
    chakraTheme
);

export default theme;