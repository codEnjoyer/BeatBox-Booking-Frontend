import {YMaps, Map as YMap, Placemark} from '@pbe/react-yandex-maps'

export default function Map({coordinates}) {
	return <YMaps>
		<YMap
			defaultState={{ center: [56.835659, 60.612915], zoom: 12 }}
			width='100%'
			height={320}>
			{coordinates.map(c =>
				<Placemark
					key={c[0]}
					geometry={c}
					objects={{openBalloonOnClick: true}}
					options={{
						hasHint: true,
						hasBalloon: true,
						openEmptyBalloon: true,
						openEmptyHint: true,
					}}
					properties={{
						hintContent: "Tooltip",
						balloonContent: "bitch",
						balloonContentBody: "bitchees",
					}}
				/>
			)}
		</YMap>
	</YMaps>
}