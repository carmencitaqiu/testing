import moment from "moment";
import CryptoJS from "crypto-js";
const KEY = "9e1ed0625bb1d758a5bc975477caef1f";

const encrypt = word => {
    const key = CryptoJS.enc.Utf8.parse(KEY);
    const encrypted = CryptoJS.AES.encrypt(word, key, {
        mode: CryptoJS.mode.CBC,
        iv: CryptoJS.enc.Utf8.parse("1954682168745975"),
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};

const decrypt = word => {
    const key = CryptoJS.enc.Utf8.parse(KEY);
    const decrypted = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.CBC,
        iv: CryptoJS.enc.Utf8.parse("1954682168745975"),
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

const COLORS = ["#5ADD68", "#0A2FEF", "#FFAB6E", "#FD4F4F", "#2589FF", "#FF6EB4", "#FFF500", "#D901EC"];

const calcIntervalByQueryType = (queryType, startDate, endDate) => {
    if (queryType === "1") {
        return (60 * 1000 * 60) / 10; //十分钟
    } else if (queryType === "2") {
        return (60 * 1000 * 60 * 12) / 10; //12小时
    } else if (queryType === "3") {
        return (60 * 1000 * 60 * 24) / 10; //24小时
    } else if (queryType === "4") {
        return (60 * 1000 * 60 * 24 * 7) / 10; //7天
    } else if (queryType === "5") {
        return (60 * 1000 * 60 * 24 * 30) / 10; //7天
    } else if (queryType === "6") {
        //TODO:根据自定义的时间段，得到总共的时间间隔（毫秒为单位） / 10
        const startDateTime = new Date(moment(startDate)).getTime();
        const endDateTime = new Date(moment(endDate)).getTime();
        const interval = (endDateTime - startDateTime) / 10;
        return interval;
    }
};

/**
 *
 * @param {*} tvocIndexValue the index value
 * @param {*} tvocType 0：index 格式（默认值），1: ppb ，2: ppb(WELL) ,3: ug/m3(RESET) ，4: mg/m3(RESET) 5:ug/m3(WELL) 6:mg/m3(WELL)
 * @returns
 */
const calculateTVOC = (tvocIndexValue, tvocType) => {
    if (tvocIndexValue === -1) {
        return "--";
    }
    // 计算 TVOC Ethanol (ppb) --> 1 return (公共变量)
    const ppb = parseInt((Math.log(501 - parseInt(tvocIndexValue, 10)) - 6.24) * -381.97, 10);

    if (tvocType === "0") {
        return tvocIndexValue;
    } else if (tvocType === "1") {
        return ppb;
    } else if (tvocType === "2") {
        const wellPpb = parseInt(0.58 * ppb, 10);
        return wellPpb;
    } else if (tvocType === "3" || tvocType === "4") {
        const resetUg = Number((Math.log(501 - tvocIndexValue) - 6.24) * -878.53).toFixed(1);
        if (tvocType === "3") {
            return resetUg;
        } else {
            const mgToUgOfReset = Number(resetUg / 1000).toFixed(2);
            return mgToUgOfReset;
        }
    } else if (tvocType === "5" || tvocType === "6") {
        const wellUgM3 = Number((Math.log(501 - tvocIndexValue) - 6.24) * -996.94).toFixed(1);
        if (tvocType === "5") {
            return wellUgM3;
        } else {
            const mgToUgOfWell = Number(wellUgM3 / 1000).toFixed(2);
            return mgToUgOfWell;
        }
    }
};

const convertDataToNormalUnit = (type, value) => {
    const preferenceOuterObj = JSON.parse(localStorage.getItem("PREFERENCE"));
    const { preference = {} } = preferenceOuterObj || {};
    const { aqi, co2, tvoc, pm25, pm10, no2, temperature, ozone, pressure, co } = preference;
    if (type === "pm25") {
        // 1: ug/m3 默认值， 2: mg/m3
        if (value === -1) {
            return "--";
        }
        //TODO: for testing
        value =
            value >= 50 && value <= 300 ? parseInt(value * 1.12, 10) : value > 300 ? parseInt(value * 1.2, 10) : value;
        if (pm25 != "1") {
            return value / 1000;
        } else {
            return value;
        }
    } else if (type === "pm10") {
        if (value === -1) {
            return "--";
        }
        // 1: ug/m3 默认值 ，2: mg/m3
        if (pm10 != "1") {
            return value / 1000;
        } else {
            return value;
        }
    } else if (type === "co2") {
        if (value === -1) {
            return "--";
        }
        // 1:ppb ,2:ppm 默认值 2
        if (co2 != "2") {
            //求ppb与ppm的转换方法
            return value * 1000;
        } else {
            return value;
        }
    } else if (type === "tvoc") {
        //0:Index 1: ppb 默认值 ，2: ppm ,3: ug/m3 ，4: mg/m3
        /** 0：Index是默认值， 非0 的时候，要将原本是Index值往对应的方向转换 
        if (tvoc != "1") {
            if (tvoc === "2") {
                //TODO: ppb ---> ppm
                return value / 1000;
            } else if (tvoc === "3") {
                // TODO: ppb --> ug/m3
                return value * 4.5;
            } else if (tvoc === "4") {
                //TODO: ppb --> mg/m3
                return (value * 4.5) / 1000;
            } else if (tvoc === "0") {
                //Index -> ppb(当Index = 100时)【(501-Index)-6.24】*2.2154 = 874.5 ppb
                const transferValue = ((501 - value) - 6.24) * 2.2154;
                return transferValue;
            }
        } else {
            return value;
        }
        */
        // if (tvoc != "0") {
        //     //首先转换为ppb
        //     // const convertedPPB = parseInt((501 - value - 6.24) * 2.2154, 10);
        //     if (tvoc === "1") {
        //         //TODO: ppb: 将Index --> ppb
        //         return value;
        //     } else if (tvoc === "2") {
        //         //TODO: ppm: 将Index --> ppm
        //         return value / 1000;
        //     } else if (tvoc === "3") {
        //         //TODO: ug/m3: 将Index --> ug/m3
        //         return value * 4.5;
        //     } else if (tvoc === "4") {
        //         //TODO: mg/m3: 将Index --> mg/m3
        //         return (value * 4.5) / 1000;
        //     }
        // } else {
        //     return value;
        // }
        return calculateTVOC(value, tvoc);
    } else if (type === "temperature") {
        //1: °C 默认值 2: °F
        if (temperature == "1") {
            //TODO: C->F
            return value;
        } else {
            //TODO: C->F
            return parseInt((9 / 5) * value + 32, 10);
        }
    } else if (type === "pressure") {
        if (value === -1) {
            return "--";
        }
        if (pressure === "1") {
            //TODO: 默认值：hpa
            return value;
        } else {
            //TODO: kpa:hpa -> kpa
            return value / 10;
        }
    } else if (type === "noise") {
        if (value === -1) {
            return "--";
        }
        return value;
    } else if (type === "light") {
        if (value === -1) {
            return "--";
        }
        return value;
    } else if (type === "no2") {
        if (value === -1) {
            return "--";
        }
        // TODO: 1: ppb 默认值,  2: ppm ，3: ug/m3 ，4: mg/m3
        if (no2 === "1") {
            //TODO: ppb: 将Index --> ppb
            return value;
        } else if (no2 === "2") {
            //TODO: ppm: 将Index --> ppm
            return value / 1000;
        } else if (no2 === "3") {
            //TODO: ug/m3: 将Index --> ug/m3
            return value * 4.5;
        } else if (no2 === "4") {
            //TODO: mg/m3: 将Index --> mg/m3
            return (value * 4.5) / 1000;
        }
    } else if (type === "ozone") {
        if (value === -1) {
            return "--";
        }
        if (ozone === "1") {
            //TODO: ppb: 将Index --> ppb
            return value;
        } else if (ozone === "2") {
            //TODO: ppm: 将Index --> ppm
            return value / 1000;
        } else if (ozone === "3") {
            //TODO: ug/m3: 将Index --> ug/m3
            return value * 4.5;
        } else if (ozone === "4") {
            //TODO: mg/m3: 将Index --> mg/m3
            return (value * 4.5) / 1000;
        }
    } else if (type === "co") {
        if (value === -1) {
            return "--";
        }
        if (co === "1") {
            //ppm
            return value;
        } else if (co === "2") {
            //ppm -> ppb
            return value * 1000;
        } else if (co === "3") {
            // 1ppm = 684.84 µg/m³ 3: ug/m3
            return value * 684.84;
        } else if (co === "4") {
            // mg/m3 4: mg/m3
            return (value * 684.84) / 1000;
        }
    } else {
        //ozone humidity
        return value === -1 ? "--" : value;
    }
};

const calcByMethod = (value, method) => {
    switch (method) {
        case "divide1000":
            return value / 1000;
        case "multiply1000":
            return value * 1000;
        case "multiply45":
            return value * 4.5;
        case "divide450":
            return (value * 4.5) / 1000;
        case "FtoC":
            return ((value - 32) * 5) / 9;
        default:
            return value;
    }
};

const getRandomColorForDot = (item, type) => {
    const preferenceOuterObj = JSON.parse(localStorage.getItem("PREFERENCE"));
    const { preference = {} } = preferenceOuterObj || {};
    const { aqi } = preference;
    if (item === 0) {
        return "gray";
    } else {
        if (type === "pm10") {
            // 1: ug/m3 默认值 ，2: mg/m3
            if (aqi == "2") {
                //1:aqicn,2:aqius
                if (item > 0 && item < 54) {
                    return "rgba(0,228,0,1)";
                } else if (item >= 54 && item < 154) {
                    return "rgba(255,255,0,1)";
                } else if (item >= 154 && item < 254) {
                    return "rgba(255,126,0,1)";
                } else if (item >= 254 && item < 354) {
                    return "rgba(255,0,0,1)";
                } else if (item >= 354 && item < 424) {
                    return "rgba(143,63,151,1)";
                } else {
                    return "rgba(0,228,0,1)";
                }
                // }
            } else {
                //aqicn

                if (item > 0 && item < 50) {
                    return "rgba(0,228,0,1)";
                } else if (item >= 50 && item < 150) {
                    return "rgba(255,255,0,1)";
                } else if (item >= 150 && item < 250) {
                    return "rgba(255,126,0,1)";
                } else if (item >= 250 && item < 350) {
                    return "rgba(255,0,0,1)";
                } else if (item >= 350 && item < 420) {
                    return "rgba(143,63,151,1)";
                } else {
                    return "rgba(0,228,0,1)";
                }
            }
        } else if (type === "pm25") {
            // 1: aqicn, 2: aqius 默认值 2
            if (aqi == "2") {
                //  2: aqius

                if (item > 0 && item < 9.0) {
                    return "rgba(0,228,0,1)";
                } else if (item >= 9.1 && item < 35.4) {
                    return "rgba(255,255,0,1)";
                } else if (item >= 35.5 && item < 55.4) {
                    return "rgba(255,126,0,1)";
                } else if (item >= 55.5 && item < 125.4) {
                    return "rgba(255,0,0,1)";
                } else if (item >= 125.5 && item <= 224.4) {
                    return "rgba(143,63,151,1)";
                } else if (item >= 225.5 && item <= 325.4) {
                    return "rgba(126,0,35,1)";
                } else {
                    return "rgba(126,0,35,1)";
                }
            } else {
                //aqicn
                if (item > 0 && item < 35.0) {
                    return "rgba(0,228,0,1)";
                } else if (item >= 35.1 && item < 75) {
                    return "rgba(255,255,0,1)";
                } else if (item >= 75.1 && item < 115) {
                    return "rgba(255,126,0,1)";
                } else if (item >= 115.1 && item < 150) {
                    return "rgba(255,0,0,1)";
                } else if (item >= 150.1 && item < 250) {
                    return "rgba(143,63,151,1)";
                } else if (item >= 250.1 && item <= 500) {
                    return "rgba(126,0,35,1)";
                } else {
                    return "rgba(126,0,35,1)";
                }
            }
        } else if (type === "airQuality") {
            if (item > 0 && item < 50) {
                return "rgba(0,228,0,1)";
            } else if (item >= 50 && item < 100) {
                return "rgba(255,255,0,1)";
            } else if (item >= 100 && item < 150) {
                return "rgba(255,126,0,1)";
            } else if (item >= 150 && item < 200) {
                return "rgba(255,0,0,1)";
            } else if (item >= 200 && item < 300) {
                return "rgba(143,63,151,1)";
            } else if (item >= 300 && item <= 500) {
                return "rgba(126,0,35,1)";
            } else {
                return "rgba(0,228,0,1)";
            }
        } else if (type === "tvoc") {
            //TODO:0：index 格式（默认值），1: ppb ，2: ppb(WELL) ,3: ug/m3(RESET) ，4: mg/m3(RESET) 5:ug/m3(WELL) 6:mg/m3(WELL)

            if (item > 0 && item < 100) {
                return "rgba(0,228,0,1)";
            } else if (item >= 101 && item < 150) {
                return "rgba(255,255,0,1)";
            } else if (item >= 151 && item < 200) {
                return "rgba(255,126,0,1)";
            } else if (item >= 201 && item < 300) {
                return "rgba(255,0,0,1)";
            } else if (item >= 301 && item < 500) {
                return "rgba(143,63,151,1)";
            } else {
                return "rgba(0,228,0,1)";
            }
        } else if (type === "humidity") {
            if (item >= 40 && item <= 50) {
                return "rgba(0,228,0,1)";
            } else if ((item >= 35 && item <= 39) || (item <= 60 && item >= 51)) {
                return "rgba(255,255,0,1)";
            } else if ((item >= 20 && item <= 34) || (item <= 64 && item >= 61)) {
                return "rgba(255,126,0,1)";
            } else if ((item >= 15 && item < 19) || (item >= 65 && item <= 80)) {
                return "rgba(255,0,0,1)";
            } else if ((item <= 14 && item >= 1) || item <= 100 || item >= 80) {
                return "rgba(143,63,151,1)";
            } else {
                return "rgba(0,228,0,1)";
            }
        } else if (type === "temperature") {
            // if (temperature == "1") {
            //基于摄氏度的标准
            if (item >= 18 && item <= 25) {
                return "rgba(0,228,0,1)";
            } else if ((item >= 16 && item <= 17.99) || (item >= 25.1 && item <= 26.99)) {
                return "rgba(255,255,0,1)";
            } else if ((item >= 10 && item <= 15.99) || (item >= 26.99 && item <= 29.99)) {
                return "rgba(255,126,0,1)";
            } else if ((item >= 5.99 && item <= 10) || (item >= 29.99 && item <= 35.99)) {
                return "rgba(255,0,0,1)";
            } else if ((item > 0 && item < 5.99) || item > 35.99) {
                return "rgba(143,63,151,1)";
            } else {
                return "rgba(0,228,0,1)";
            }
        } else if (type === "co2") {
            //2:ppm 默认值的标准
            if (item > 0 && item < 800) {
                return "rgba(0,228,0,1)";
            } else if (item >= 800 && item < 1500) {
                return "rgba(255,255,0,1)";
            } else if (item >= 1500 && item < 2000) {
                return "rgba(255,126,0,1)";
            } else if (item >= 2000 && item < 2500) {
                return "rgba(255,0,0,1)";
            } else if (item >= 2500) {
                return "rgba(143,63,151,1)";
            } else {
                return "rgba(0,228,0,1)";
            }
        } else if (type === "co") {
            if (item > 0 && item <= 4.4) {
                return "rgba(0,228,0,1)";
            } else if (item >= 4.4 && item <= 9.4) {
                return "rgba(255,255,0,1)";
            } else if (item > 9.4 && item <= 12.4) {
                return "rgba(255,126,0,1)";
            } else if (item > 12.4 && item <= 15.4) {
                return "rgba(255,0,0,1)";
            } else if (item > 15.4) {
                return "rgba(143,63,151,1)";
            } else {
                return "rgba(0, 228,0 ,1)";
            }
        } else if (type === "no2") {
            if (item > 0 && item <= 53) {
                return "rgba(0,228,0,1)";
            } else if (item >= 53 && item <= 100) {
                return "rgba(255,255,0,1)";
            } else if (item > 100 && item <= 360) {
                return "rgba(255,126,0,1)";
            } else if (item > 360 && item <= 649) {
                return "rgba(255,0,0,1)";
            } else if (item > 650) {
                return "rgba(143,63,151,1)";
            } else {
                return "rgba(0, 228,0 ,1)";
            }
        } else if (type === "ozone") {
            if (item > 0 && item <= 54) {
                return "rgba(0,228,0,1)";
            } else if (item >= 54 && item <= 70) {
                return "rgba(255,255,0,1)";
            } else if (item > 70 && item <= 85) {
                return "rgba(255,126,0,1)";
            } else if (item > 86 && item <= 105) {
                return "rgba(255,0,0,1)";
            } else if (item > 105 && item <= 200) {
                //purple
                return "rgba(143,63,151,1)";
            } else if (item > 201 && item < 604) {
                //brown
                return "rgba(126,0,35,1)";
            } else {
                return "rgba(0, 228,0 ,1)";
            }
        } else if (type === "noise") {
            if (item > 0 && item <= 70) {
                return "rgba(0,228,0,1)";
            } else if (item > 70) {
                return "rgba(255,0,0,1)";
            } else {
                return "rgba(0, 228,0 ,1)";
            }
        } else {
            return "rgba(0, 228, 0,1)";
        }
    }
};

const COLOR_MAP = {
    "rgba(0,228,0,1)": "Good Air Quality",
    "rgba(255,255,0,1)": "Moderate Air Quality",
    "rgba(255,126,0,1)": "Unhealthy Air Quality",
    "rgba(255,0,0,1)": "Unhealthy Air Quality",
    "rgba(143,63,151,1)": "Unhealthy Air Quality",
    "#000000": "Unhealthy Air Quality"
};

const DURATIONS = [
    {
        value: 1,
        label: "Last hour"
    },
    {
        value: 3,
        label: "Last 24 hours"
    },
    {
        value: 2,
        label: "Last 12 hours"
    },
    {
        value: 4,
        label: "Last 7 days"
    },
    {
        value: 5,
        label: "Last 30 days"
    },
    {
        value: 6,
        label: "Customize"
    }
];

const calcOneMonthLater = dateRangeValue => {
    const start = new Date(dateRangeValue[0]).getTime();
    const end = moment(start).add(1, "month");
    const toLate = dateRangeValue[1] > end;
    return toLate;
};

const getQueryString = name => {
    const url = location.hash;
    const PARAMS = url.match(/([^?&]+)=([^&]*)/g);
    const paramsObj = {};
    // 参数缓存
    PARAMS &&
        PARAMS.reduce((params, item) => {
            // 符号`=`索引
            const index = item.indexOf("=");
            params[item.slice(0, index)] = item.slice(index + 1);
            return params;
        }, paramsObj);
    if (paramsObj[name]) {
        return decodeURIComponent(paramsObj[name]);
    } else {
        return "";
    }
};

const TYPE_MAP = {
    airQuality: "Air Quality Index",
    co2: "CO₂",
    pm25: "PM2.5",
    temperature: "Temperature",
    humidity: "Humidity",
    tvoc: "TVOC",
    no2: "NO2",
    randon: "Randon",
    co: "CO",
    noise: "Noise",
    pm10: "PM10",
    pressure: "Air Pressure",
    light: "Light",
    pc03: "PC0.3",
    pc10: "PC10",
    pc25: "PC2.5",
    nox: "NOx",
    ozone: "Ozone"
};

export {
    encrypt,
    decrypt,
    COLORS,
    calcIntervalByQueryType,
    convertDataToNormalUnit,
    getRandomColorForDot,
    calcOneMonthLater,
    COLOR_MAP,
    getQueryString,
    DURATIONS,
    TYPE_MAP,
    calculateTVOC
};
