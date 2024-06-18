import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
    useKakaoLoaderOrigin({
        appkey: "19e012afd234d54ef1ff5011f2ce81c5",
        libraries: ["clusterer", "drawing", "services"],
    });
}