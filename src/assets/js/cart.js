/**
 * Created by hc on 2017/4/4.
 */
function check () {
  var cartBoxs = document.getElementsByClassName('check_box')
  for (var i = 0; i < cartBoxs.length; i++) {
    cartBoxs[i].onclick = function () {
      var hasChecked = this.getAttribute('checked')
      if (hasChecked != null) {
        this.removeAttribute('checked')
      } else {
        this.setAttribute('checked', '')
      }
    }
  }
};

function animatDelBox () {
  var cartDel = document.getElementsByClassName('cart_del')
  var pop = document.getElementsByClassName('pop')[0]
  var popBox = document.getElementsByClassName('pop_box')[0]
  var delUp = null
  for (var i = 0; i < cartDel.length; i++) {
    cartDel[i].onclick = function () {
      pop.style.display = 'block'
      popBox.className = 'pop_box delBoxOut'

      this.children[0].style.transition = 'all 1s ease 0s'
      this.children[0].style.webkitTransition = 'all 1s ease 0s'
      this.children[0].style.transform = 'translateY(-5px) translateX(-2px) rotate(-45deg)'
      this.children[0].style.webkitTransform = 'translateY(-5px) translateX(-2px) rotate(-45deg)'
      delUp = this.children[0]
    }
  }
  document.getElementsByClassName('del_cancel')[0].onclick = function () {
    pop.style.display = 'none'
    popBox.className = 'pop_box'
    if (delUp) {
      delUp.style.transform = 'translateY(0px) translateX(0px) rotate(0deg)'
      delUp.style.webkitTransform = 'translateY(0px) translateX(0px) rotate(0deg)'
    }
  }
  document.getElementsByClassName('del_ok')[0].onclick = function () {
    pop.style.display = 'none'
    popBox.className = 'pop_box'
    if (delUp) {
      delUp.style.transform = 'translateY(0px) translateX(0px) rotate(0deg)'
      delUp.style.webkitTransform = 'translateY(0px) translateX(0px) rotate(0deg)'
    }
  }
}

module.exports = {
  check,
  animatDelBox
}
