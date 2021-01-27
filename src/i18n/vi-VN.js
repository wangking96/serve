"use strict";

exports.__esModule = true;
exports.default = void 0;
var _default = {
  name: 'Tên',
  tel: 'Điện thoại',
  save: 'Tiết kiệm',
  confirm: 'Xác nhận',
  cancel: 'Huỷ bỏ',
  delete: 'Xóa bỏ',
  complete: 'Hoàn thành',
  loading: 'Đang tải...',
  telEmpty: 'Vui lòng điền vào số điện thoại',
  nameEmpty: 'Vui lòng điền tên',
  nameInvalid: 'Tên không đúng định dạng',
  confirmDelete: 'Bạn có chắc chắn muốn xóa?',
  telInvalid: 'Số điện thoại không đúng định dạng',
  vanCalendar: {
    end: 'Kết thúc',
    start: 'Khởi đầu',
    title: 'Lịch',
    startEnd: 'Bắt đầu / Kết thúc',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthTitle: function monthTitle(year, month) {
      return year + "/" + month;
    },
    rangePrompt: function rangePrompt(maxRange) {
      return "Chọn không quá" + maxRange + "ngày";
    }
  },
  vanContactCard: {
    addText: 'Thêm thông tin liên hệ'
  },
  vanContactList: {
    addText: 'Thêm liên hệ mới'
  },
  vanPagination: {
    prev: 'Trước',
    next: 'Kế tiếp'
  },
  vanPullRefresh: {
    pulling: 'Kéo để làm mới...',
    loosing: 'Loose để làm mới ...'
  },
  vanSubmitBar: {
    label: 'Toàn bộ:'
  },
  vanCoupon: {
    unlimited: 'Vô hạn',
    discount: function discount(_discount) {
      return _discount * 10 + "% off";
    },
    condition: function condition(_condition) {
      return "Ít nhất " + _condition;
    }
  },
  vanCouponCell: {
    title: 'Phiếu mua hàng',
    tips: 'Không có phiếu giảm giá',
    count: function count(_count) {
      return "Bạn có" + _count + "phiếu giảm giá";
    }
  },
  vanCouponList: {
    empty: 'Không có phiếu giảm giá',
    exchange: 'Đổi',
    close: 'Đóng',
    enable: 'Có sẵn',
    disabled: 'Không có sẵn',
    placeholder: 'Mã giảm giá'
  },
  vanAddressEdit: {
    area: 'Khu vực',
    postal: 'Thuộc về bưu điện',
    areaEmpty: 'Vui lòng chọn khu vực nhận hàng',
    addressEmpty: 'Địa chỉ không được để trống',
    postalEmpty: 'Mã bưu điện sai',
    defaultAddress: 'Đặt làm địa chỉ mặc định',
    telPlaceholder: 'Điện thoại',
    namePlaceholder: 'Tên',
    areaPlaceholder: 'Khu vực'
  },
  vanAddressEditDetail: {
    label: 'Địa chỉ',
    placeholder: 'Địa chỉ'
  },
  vanAddressList: {
    add: 'thêm địa chỉ mới'
  }
};
exports.default = _default;