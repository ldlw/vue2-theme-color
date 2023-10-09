import color from 'css-color-function'
// 这里是elementui对应的颜色公式，和elementui源码中的formula一致
import elementFormula from './elementFormula'

const version = require('element-ui/package.json').version // 版本号
// element_ui默认的主题色
let themeColor = '#409EFF'
// 所有element_ui的默认样式
let themeChalk = null

// RGB颜色转16进制
function convertColor (RGBColor) {
  // 转成 xxx, xxx, xxx
 let rgbArray = RGBColor.slice(4, RGBColor.length - 1).replace(/s/g, '').split(',')
  let red = Number(rgbArray[0]).toString(16)
  let green = Number(rgbArray[1]).toString(16)
  let blue = Number(rgbArray[2]).toString(16)
  return red + green + blue
}

// 获取默认element_ui颜色转换后的数组
function getThemeColorArray (theme) {
  let colors = [theme.replace('#', '')]
  Object.keys(elementFormula).forEach(key => {
    const value = elementFormula[key].replace(/primary/g, theme)
    // 根据公式转成对应的rgb颜色，但比对用的是16进制颜色
    let RGBColor = color.convert(value)
    colors.push(convertColor(RGBColor))
  })
  return colors
}

/**
 * 替换掉所有的旧颜色
 * @param {Array} oldStyleArray 老的element_ui颜色数组，使用element_ui默认的主题色生成
 * @param {Array} newStyleArray 新颜色数组，通过 getThemeColorArray 方法转换颜色生成
 * */
function updateStyle (oldStyleArray, newStyleArray) {
  oldStyleArray.forEach((color, index) => {
    themeChalk = themeChalk.replace(new RegExp(color, 'ig'), newStyleArray[index])
  })
  return themeChalk
}

function getCSSString (url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      themeChalk = xhr.responseText.replace(/@font-face{[^}]+}/, '')
      callback()
    }
  }
  xhr.open('GET', url)
  xhr.send()
}

// 转换主题颜色
export function changeThemeColor (primary) {
  if (typeof primary !== 'string') return
  // 生成新的对应颜色数组
  const themeStyleArray = getThemeColorArray(primary)
  const getHandler = (id) => {
    return () => {
      const originalStyleArray = getThemeColorArray(themeColor)
      const newStyle = updateStyle(
        originalStyleArray,
        themeStyleArray
      )

      let styleTag = document.getElementById(id)
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.setAttribute('id', id)
        document.head.appendChild(styleTag)
      }
      styleTag.innerText = newStyle
      themeColor = primary
    }
  }
  const themeHandler = getHandler('redcat-theme-style')

  // 第一次从cdn获取对应的样式文件
  if (!themeChalk) {
    const url = `//unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
    getCSSString(url, themeHandler)
  } else {
    themeHandler()
  }
}
