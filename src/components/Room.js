export default function Room({ room, studio }) {
	return (
        <div className="container">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold mb-4">{room.title}</h1>
                <span className="text-lg">Цена: от {room.price} ₽</span>
            </div>
            <p>{room.desc}</p>
        </div>
    );
}