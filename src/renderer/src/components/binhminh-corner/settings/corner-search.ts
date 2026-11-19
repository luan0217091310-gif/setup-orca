import { createLocalizedCatalog } from '@/i18n/localized-catalog'

export const getCornerPaneSearchEntries = createLocalizedCatalog(() => [
  {
    title: 'Doraemon và Luffy Gear 5',
    description: 'Thú cưng 3D, giọng nói tiếng Việt và ảnh trang trí tách nền.',
    keywords: ['doraemon', 'luffy', 'gear 5', 'giong noi', 'voice', 'speech']
  },
  {
    title: 'Tên hiển thị',
    description: 'Đổi tên trên thanh trên cùng.',
    keywords: ['ten hien thi', 'display name', 'chu ky', 'signature', 'ca nhan hoa']
  },
  {
    title: 'Thú cưng',
    description: 'Mèo, chó, cáo, thỏ, gấu trúc, hamster; âm thanh và tên.',
    keywords: ['pet', 'thu cung', 'meo', 'cho', 'cao', 'cat', 'dog', 'fox', 'sound', 'am thanh']
  },
  {
    title: 'Khung ảnh',
    description: 'Ảnh idol hoặc người thương, đổi theo chu kỳ, làm mờ khi chia sẻ màn hình.',
    keywords: ['photo', 'anh', 'idol', 'nguoi yeu', 'slideshow', 'privacy', 'blur']
  },
  {
    title: 'Hạn mức, CPU và RAM',
    description: 'Thẻ hạn mức Claude, Codex, Antigravity và tải máy ở cuối sidebar phải.',
    keywords: ['quota', 'han muc', 'cpu', 'ram', 'memory', 'usage', 'corner', 'goc']
  },
  {
    title: 'Kỷ niệm và lời nhắc',
    description: 'Đếm ngày bên nhau, sinh nhật, kỷ niệm, nhắc nghỉ khi thức khuya.',
    keywords: ['anniversary', 'birthday', 'sinh nhat', 'ky niem', 'reminder', 'late night']
  }
])
