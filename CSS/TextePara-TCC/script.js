// Variáveis globais
let selectedComponent = null;
let draggedComponent = null;
let componentCounter = 0;
let products = [];

// Inicialização quando o documento estiver pronto
$(document).ready(function() {
    initDragAndDrop();
    initDeviceSelector();
    initPropertyPanel();
    initProductHandling();
    initTemplateHandling();
});

// Inicializa funcionalidade de arrastar e soltar
function initDragAndDrop() {
    // Torna os componentes arrastáveis
    $('.component-item').on('dragstart', function(e) {
        draggedComponent = $(this).data('component');
        e.originalEvent.dataTransfer.setData('text/plain', draggedComponent);
        $(this).addClass('dragging');
    });

    $('.component-item').on('dragend', function() {
        $(this).removeClass('dragging');
    });

    // Configura a área de soltar
    const dropZone = document.getElementById('drop-zone');
    
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        $(this).addClass('drag-over');
    });

    dropZone.addEventListener('dragleave', function() {
        $(this).removeClass('drag-over');
    });

    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        $(this).removeClass('drag-over');
        
        const componentType = e.dataTransfer.getData('text/plain');
        if (componentType) {
            addComponent(componentType, this);
        }
    });

    // Permite clicar para selecionar componentes
    $(document).on('click', '.store-component', function(e) {
        e.stopPropagation();
        selectComponent($(this));
    });

    // Desseleciona ao clicar fora
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.store-component, .properties-panel').length) {
            deselectComponent();
        }
    });

    // Botão para remover componente
    $(document).on('click', '.remove-component', function(e) {
        e.stopPropagation();
        $(this).closest('.store-component').remove();
        deselectComponent();
    });

    // Botão para mover componente para cima
    $(document).on('click', '.move-up', function(e) {
        e.stopPropagation();
        const component = $(this).closest('.store-component');
        const prev = component.prev('.store-component');
        if (prev.length) {
            component.insertBefore(prev);
        }
    });

    // Botão para mover componente para baixo
    $(document).on('click', '.move-down', function(e) {
        e.stopPropagation();
        const component = $(this).closest('.store-component');
        const next = component.next('.store-component');
        if (next.length) {
            component.insertAfter(next);
        }
    });
}

// Adiciona um novo componente à área de edição
function addComponent(componentType, dropZone) {
    componentCounter++;
    const id = `component-${componentCounter}`;
    let componentHtml = '';
    
    // Remove a mensagem de placeholder se for o primeiro componente
    if ($('.store-component').length === 0) {
        $('.placeholder-message').hide();
    }
    
    // Gera HTML baseado no tipo de componente
    switch(componentType) {
        case 'header':
            componentHtml = `
                <div class="header-component">
                    <h2>Nome da Loja</h2>
                    <p>Slogan da sua loja aqui</p>
                </div>
            `;
            break;
        case 'hero':
            componentHtml = `
                <div class="hero-component">
                    <h1>Promoção Especial</h1>
                    <p>Descrição da sua oferta principal aqui</p>
                    <button class="btn btn-primary">Comprar Agora</button>
                </div>
            `;
            break;
        case 'product-grid':
            componentHtml = `
                <div class="product-grid-component">
                    ${generateProductCards(4)}
                </div>
            `;
            break;
        case 'featured':
            componentHtml = `
                <div class="featured-component">
                    <h2>Produtos Destacados</h2>
                    <div class="row">
                        ${generateProductCards(3, true)}
                    </div>
                </div>
            `;
            break;
        case 'testimonials':
            componentHtml = `
                <div class="testimonials-component">
                    <h2>O que nossos clientes dizem</h2>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <p>"Produto de excelente qualidade. Recomendo!"</p>
                                    <footer>- Maria Silva</footer>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <p>"Entrega rápida e atendimento nota 10."</p>
                                    <footer>- João Santos</footer>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <p>"Melhor loja online que já comprei."</p>
                                    <footer>- Ana Oliveira</footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'footer':
            componentHtml = `
                <div class="footer-component">
                    <div class="row">
                        <div class="col-md-4">
                            <h5>Sobre Nós</h5>
                            <p>Informações sobre sua loja aqui.</p>
                        </div>
                        <div class="col-md-4">
                            <h5>Links Úteis</h5>
                            <ul class="list-unstyled">
                                <li><a href="#" class="text-white">Política de Privacidade</a></li>
                                <li><a href="#" class="text-white">Termos de Uso</a></li>
                                <li><a href="#" class="text-white">FAQ</a></li>
                            </ul>
                        </div>
                        <div class="col-md-4">
                            <h5>Contato</h5>
                            <p>Email: contato@sualoja.com<br>
                            Telefone: (11) 1234-5678</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p>&copy; 2025 Sua Loja. Todos os direitos reservados.</p>
                    </div>
                </div>
            `;
            break;
        case 'text':
            componentHtml = `
                <div class="p-3">
                    <h3>Título Editável</h3>
                    <p>Clique para editar este texto. Você pode adicionar descrições, informações ou qualquer conteúdo textual para sua loja.</p>
                </div>
            `;
            break;
        case 'image':
            componentHtml = `
                <div class="text-center p-3">
                    <img src="https://via.placeholder.com/800x400" class="img-fluid" alt="Imagem">
                </div>
            `;
            break;
        case 'button':
            componentHtml = `
                <div class="text-center p-3">
                    <button class="btn btn-primary">Botão de Ação</button>
                </div>
            `;
            break;
        case 'divider':
            componentHtml = `
                <hr class="my-4">
            `;
            break;
        case 'single-product':
            componentHtml = `
                <div class="row p-3">
                    <div class="col-md-6">
                        <img src="https://via.placeholder.com/600x600" class="img-fluid" alt="Produto">
                    </div>
                    <div class="col-md-6">
                        <h2>Nome do Produto</h2>
                        <p class="text-muted">SKU: PRD12345</p>
                        <h3 class="text-primary">R$ 99,90</h3>
                        <p>Descrição detalhada do produto. Explique aqui as características, benefícios e diferenciais.</p>
                        <div class="mb-3">
                            <label class="form-label">Quantidade</label>
                            <input type="number" class="form-control" value="1" min="1" style="width: 100px">
                        </div>
                        <button class="btn btn-success btn-lg">Adicionar ao Carrinho</button>
                    </div>
                </div>
            `;
            break;
        default:
            componentHtml = `
                <div class="p-3 text-center">
                    <p>Componente ${componentType}</p>
                </div>
            `;
    }
    
    // Cria o wrapper do componente com controles
    const componentWrapper = `
        <div class="store-component" id="${id}" data-type="${componentType}">
            <div class="component-controls">
                <button class="component-control-btn move-up" title="Mover para cima">
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="component-control-btn move-down" title="Mover para baixo">
                    <i class="fas fa-arrow-down"></i>
                </button>
                <button class="component-control-btn remove-component" title="Remover">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            ${componentHtml}
        </div>
    `;
    
    // Adiciona o componente à área de edição
    $(dropZone ).append(componentWrapper);
    
    // Seleciona o componente recém-adicionado
    selectComponent($(`#${id}`));
}

// Seleciona um componente para edição
function selectComponent(component) {
    // Remove seleção anterior
    $('.store-component').removeClass('selected');
    
    // Adiciona classe de seleção
    component.addClass('selected');
    
    // Atualiza o componente selecionado
    selectedComponent = component;
    
    // Mostra o painel de propriedades
    $('#no-selection').addClass('d-none');
    $('#element-properties').removeClass('d-none');
    
    // Preenche os campos do painel de propriedades
    updatePropertyPanel();
}

// Deseleciona o componente atual
function deselectComponent() {
    $('.store-component').removeClass('selected');
    selectedComponent = null;
    
    // Esconde o painel de propriedades
    $('#no-selection').removeClass('d-none');
    $('#element-properties').addClass('d-none');
}

// Atualiza o painel de propriedades com base no componente selecionado
function updatePropertyPanel() {
    if (!selectedComponent) return;
    
    // Implementação básica - pode ser expandida para mais propriedades
    const componentType = selectedComponent.data('type');
    let title = '';
    
    // Obtém o título atual do componente
    switch(componentType) {
        case 'header':
        case 'hero':
        case 'featured':
        case 'testimonials':
            title = selectedComponent.find('h1, h2').first().text();
            break;
        case 'text':
            title = selectedComponent.find('h3').first().text();
            break;
        default:
            title = componentType.charAt(0).toUpperCase() + componentType.slice(1);
    }
    
    // Preenche o campo de título
    $('#element-title').val(title);
    
    // Obtém a cor de fundo atual
    const bgColor = selectedComponent.css('background-color');
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
        const hexColor = rgbToHex(bgColor);
        $('#element-bg-color').val(hexColor);
    } else {
        $('#element-bg-color').val('#ffffff');
    }
}

// Inicializa o seletor de dispositivos (desktop, tablet, mobile)
function initDeviceSelector() {
    $('.device-selector button').on('click', function() {
        const device = $(this).data('device');
        
        // Atualiza botões
        $('.device-selector button').removeClass('active');
        $(this).addClass('active');
        
        // Atualiza visualização
        $('.store-preview').removeClass('desktop tablet mobile').addClass(device);
    });
}

// Inicializa o painel de propriedades
function initPropertyPanel() {
    // Atualiza título do componente
    $('#element-title').on('input', function() {
        if (!selectedComponent) return;
        
        const componentType = selectedComponent.data('type');
        const newTitle = $(this).val();
        
        switch(componentType) {
            case 'header':
            case 'hero':
            case 'featured':
            case 'testimonials':
                selectedComponent.find('h1, h2').first().text(newTitle);
                break;
            case 'text':
                selectedComponent.find('h3').first().text(newTitle);
                break;
        }
    });
    
    // Atualiza cor de fundo
    $('#element-bg-color').on('input', function() {
        if (!selectedComponent) return;
        selectedComponent.css('background-color', $(this).val());
    });
    
    // Atualiza cor do texto
    $('#element-text-color').on('input', function() {
        if (!selectedComponent) return;
        selectedComponent.css('color', $(this).val());
    });
    
    // Atualiza espaçamento
    $('#element-padding').on('input', function() {
        if (!selectedComponent) return;
        const padding = $(this).val() + 'px';
        selectedComponent.css('padding', padding);
    });
    
    // Atualiza alinhamento
    $('.btn-group [data-align]').on('click', function() {
        if (!selectedComponent) return;
        
        const align = $(this).data('align');
        
        // Remove classes de alinhamento anteriores
        selectedComponent.removeClass('text-start text-center text-end');
        
        // Adiciona nova classe de alinhamento
        switch(align) {
            case 'left':
                selectedComponent.addClass('text-start');
                break;
            case 'center':
                selectedComponent.addClass('text-center');
                break;
            case 'right':
                selectedComponent.addClass('text-end');
                break;
        }
        
        // Atualiza botões
        $('.btn-group [data-align]').removeClass('active');
        $(this).addClass('active');
    });
}

// Inicializa o gerenciamento de produtos
function initProductHandling() {
    // Adiciona alguns produtos de exemplo
    products = [
        { id: 1, name: 'Camiseta Básica', price: 49.90, image: 'https://via.placeholder.com/300', category: 'roupas', stock: 20 },
        { id: 2, name: 'Tênis Esportivo', price: 199.90, image: 'https://via.placeholder.com/300', category: 'calcados', stock: 15 },
        { id: 3, name: 'Relógio Inteligente', price: 299.90, image: 'https://via.placeholder.com/300', category: 'acessorios', stock: 10 },
        { id: 4, name: 'Fone de Ouvido Bluetooth', price: 89.90, image: 'https://via.placeholder.com/300', category: 'eletronicos', stock: 30 }
    ];
    
    // Salvar novo produto
    $('#saveProduct' ).on('click', function() {
        const newProduct = {
            id: products.length + 1,
            name: $('#productName').val(),
            description: $('#productDescription').val(),
            price: parseFloat($('#productPrice').val()),
            image: 'https://via.placeholder.com/300',
            category: $('#productCategory' ).val(),
            stock: parseInt($('#productStock').val())
        };
        
        products.push(newProduct);
        
        // Fecha o modal
        $('#addProductModal').modal('hide');
        
        // Limpa o formulário
        $('#productForm')[0].reset();
        
        // Atualiza os componentes de produto na página
        updateProductComponents();
        
        // Exibe mensagem de sucesso
        alert('Produto adicionado com sucesso!');
    });
}

// Atualiza os componentes de produto na página
function updateProductComponents() {
    // Atualiza grades de produtos
    $('.product-grid-component').each(function() {
        $(this).html(generateProductCards(4));
    });
    
    // Atualiza produtos destacados
    $('.featured-component .row').each(function() {
        $(this).html(generateProductCards(3, true));
    });
}

// Gera cards de produtos
function generateProductCards(count, featured = false) {
    let html = '';
    const productsToShow = featured ? products.slice(0, count) : products.slice(0, count);
    
    if (featured) {
        for (const product of productsToShow) {
            html += `
                <div class="col-md-4">
                    <div class="card mb-3 product-card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text text-primary">R$ ${product.price.toFixed(2)}</p>
                            <button class="btn btn-sm btn-outline-primary">Ver Detalhes</button>
                        </div>
                    </div>
                </div>
            `;
        }
    } else {
        for (const product of productsToShow) {
            html += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h5>${product.name}</h5>
                    <p class="text-primary">R$ ${product.price.toFixed(2)}</p>
                    <button class="btn btn-sm btn-outline-primary">Ver Detalhes</button>
                </div>
            `;
        }
    }
    
    return html;
}

// Inicializa o gerenciamento de templates
function initTemplateHandling() {
    // Seleciona um template
    $('.template-card').on('click', function() {
        $('.template-card').removeClass('selected');
        $(this).addClass('selected');
    });
    
    // Aplica o template selecionado
    $('#applyTemplate').on('click', function() {
        const selectedTemplate = $('.template-card.selected').data('template');
        
        if (!selectedTemplate) {
            alert('Por favor, selecione um template.');
            return;
        }
        
        // Limpa a área de edição
        $('#drop-zone').empty();
        
        // Adiciona componentes com base no template selecionado
        applyTemplate(selectedTemplate);
        
        // Fecha o modal
        $('#templateModal').modal('hide');
    });
}

// Aplica um template pré-definido
function applyTemplate(template) {
    // Remove a mensagem de placeholder
    $('.placeholder-message').hide();
    
    // Adiciona componentes com base no template
    switch(template) {
        case 'fashion':
            addComponent('header', document.getElementById('drop-zone'));
            addComponent('hero', document.getElementById('drop-zone'));
            addComponent('featured', document.getElementById('drop-zone'));
            addComponent('product-grid', document.getElementById('drop-zone'));
            addComponent('testimonials', document.getElementById('drop-zone'));
            addComponent('footer', document.getElementById('drop-zone'));
            break;
        case 'electronics':
            addComponent('header', document.getElementById('drop-zone'));
            addComponent('hero', document.getElementById('drop-zone'));
            addComponent('product-grid', document.getElementById('drop-zone'));
            addComponent('featured', document.getElementById('drop-zone'));
            addComponent('footer', document.getElementById('drop-zone'));
            break;
        case 'minimal':
            addComponent('header', document.getElementById('drop-zone'));
            addComponent('hero', document.getElementById('drop-zone'));
            addComponent('product-grid', document.getElementById('drop-zone'));
            addComponent('footer', document.getElementById('drop-zone'));
            break;
        default:
            addComponent('header', document.getElementById('drop-zone'));
            addComponent('hero', document.getElementById('drop-zone'));
            addComponent('product-grid', document.getElementById('drop-zone'));
            addComponent('footer', document.getElementById('drop-zone'));
    }
}

// Utilitário para converter RGB para HEX
function rgbToHex(rgb) {
    if (rgb.startsWith('#')) return rgb;
    
    // Extrai os valores RGB
    const rgbArray = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!rgbArray) return '#ffffff';
    
    // Converte para HEX
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    
    return "#" + hex(rgbArray[1]) + hex(rgbArray[2]) + hex(rgbArray[3]);
}
