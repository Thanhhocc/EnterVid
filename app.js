// --- CƠ SỞ DỮ LIỆU VIDEO (Dạng giả lập) ---
// Bạn có thể thay thế các URL này bằng video và ảnh của riêng bạn.
const videos = [
    {
        id: 1,
        title: 'Hot tiktoker cà hẩy, bắn tinh siêu mạnh',
        thumbnail: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600',
        videoSrc: 'https://videos.pexels.com/video-files/854251/854251-hd_1920_1080_25fps.mp4',
        description: 'Cùng chiêm ngưỡng những cảnh quay tuyệt đẹp về núi non hùng vĩ và những hồ nước trong xanh.'
    },
    {
        id: 2,
        title: 'Thành Phố Về Đêm Từ Trên Cao',
        thumbnail: 'https://images.pexels.com/photos/236683/pexels-photo-236683.jpeg?auto=compress&cs=tinysrgb&w=600',
        videoSrc: 'https://videos.pexels.com/video-files/5524953/5524953-hd_1920_1080_30fps.mp4',
        description: 'Một góc nhìn khác về thành phố sôi động khi màn đêm buông xuống, lung linh với hàng triệu ánh đèn.'
    },
    {
        id: 3,
        title: 'Sóng Biển Dịu Êm Dưới Ánh Hoàng Hôn',
        thumbnail: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600',
        videoSrc: 'https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4',
        description: 'Thư giãn với tiếng sóng vỗ và cảnh hoàng hôn rực rỡ trên biển.'
    },
    {
        id: 4,
        title: 'Dòng Suối Mát Lạnh Trong Rừng Sâu',
        thumbnail: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
        videoSrc: 'https://videos.pexels.com/video-files/856003/856003-hd_1920_1080_25fps.mp4',
        description: 'Khám phá vẻ đẹp hoang sơ của khu rừng và lắng nghe tiếng suối chảy róc rách.'
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
