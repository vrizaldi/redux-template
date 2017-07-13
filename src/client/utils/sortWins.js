export default function sortWins(wins) {
	wins.sort((a, b) => {
		return new Date(b.timestamp) - new Date(a.timestamp);
	});
}