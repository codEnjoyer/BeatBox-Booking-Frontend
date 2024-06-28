export default function Review({review, roomById, name}) {
	console.log(review)
	return (
		<div className=" max-w-[540px] bg-[#222] w-full rounded-xl p-4">
			<div className="top flex items-center gap-4">
				<span className="font-semibold">{review.author.nickname}</span>
				<span className="text-lg text-accent font-semibold">★ {review.grade} / 5</span>
				{roomById && review.room_id &&
					<span className="text-secondary">{roomById[review.room_id].name}</span>
				}
			</div>
			<p className="text-secondary text-sm mb-2">{review.room}</p>

			<p className="whitespace-pre-wrap">{review.text}</p>
		</div>
	)
}