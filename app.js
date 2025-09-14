// --- CƠ SỞ DỮ LIỆU VIDEO (Dạng giả lập) ---
// Bạn có thể thay thế các URL này bằng video và ảnh của riêng bạn.
const videos = [
    {
        id: 1,
        title: 'Hot tiktoker cà hẩy, bắn tinh siêu mạnh. Link full: https://link2m.com/HbTP7TT',
        thumbnail: 'entervid1anh.png',
        videoSrc: 'entervid1video.mp4',
        description: 'Đã đẹp trai rồi mà bắn tinh còn mạnh nữa thì ai chịu nổi'
    },
    
];

// --- HÀM CHO TRANG CHỦ ---
function renderHomepage() {
    const videoGrid = document.getElementById('video-grid');
    if (!videoGrid) return; // Chỉ chạy nếu có video-grid

    videoGrid.innerHTML = ''; // Xóa nội dung cũ

    videos.forEach(video => {
        const videoCardHTML = `
            <a href="watch.html?id=${video.id}" class="video-card">
                <img src="${video.thumbnail}" alt="${video.title}">
                <h3 class="card-title">${video.title}</h3>
            </a>
        `;
        videoGrid.innerHTML += videoCardHTML;
    });
}


// --- HÀM CHO TRANG XEM VIDEO ---
function renderWatchPage() {
    const videoPlayerContainer = document.getElementById('video-player-container');
    const videoTitleEl = document.getElementById('video-title');
    const videoDescriptionEl = document.getElementById('video-description');
    const recommendationsEl = document.getElementById('recommendations');

    // Chỉ chạy nếu các thành phần này tồn tại
    if (!videoPlayerContainer || !recommendationsEl) return;

    // 1. Lấy ID video từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = parseInt(urlParams.get('id'));
    const currentVideo = videos.find(v => v.id === videoId);

    if (!currentVideo) {
        videoPlayerContainer.innerHTML = '<p>Không tìm thấy video!</p>';
        return;
    }

    // 2. Cập nhật trình phát video và thông tin
    document.title = `Đang xem: ${currentVideo.title}`; // Cập nhật tiêu đề trang
    videoPlayerContainer.innerHTML = `
        <video controls autoplay muted src="${currentVideo.videoSrc}">
            Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
    `;
    videoTitleEl.textContent = currentVideo.title;
    videoDescriptionEl.textContent = currentVideo.description;

    // 3. Hiển thị các video đề xuất (trừ video hiện tại)
    const recommendedVideos = videos.filter(v => v.id !== videoId);
    recommendationsEl.innerHTML = ''; // Xóa nội dung cũ

    recommendedVideos.forEach(video => {
        const recCardHTML = `
            <a href="watch.html?id=${video.id}" class="recommendation-card">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div>
                    <h4 class="rec-title">${video.title}</h4>
                </div>
            </a>
        `;
        recommendationsEl.innerHTML += recCardHTML;
    });
}
