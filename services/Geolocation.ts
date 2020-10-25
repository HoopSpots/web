// @ts-ignore
export const getPosition = (options?: PositionOptions): Promise<Position>  =>{
    if (process.browser) {
        return new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        );
    }
};
